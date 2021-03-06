const resUtil = require('../module/responseUtil');
const resMsg = require('../module/resMsg');
const statCode = require('../module/statusCode');
const pool = require('../module/pool');
const schedules = require('../models/schedulesModel');
const odsayAPI = require('../module/odsayAPI');
const timeCalc = require('../module/timeCalc');
var moment = require('moment');
const alarm = require('../module/alarm');

module.exports = {
    addSchedule: async (req, res) => {
        let body = req.body;
        let subPath = body.path.subPath;
        let startTm = moment(body.scheduleStartTime, 'YYYY-MM-DD HH:mm')
        try {
            let addScheduleResult = await schedules.addSchedule(body.scheduleName, body.scheduleStartTime, body.startAddress, body.startLongitude, body.startLatitude, body.endAddress, body.endLongitude, body.endLatitude);
            let addPathsResult = await schedules.addPaths(body.path.pathType, body.path.totalTime, body.path.totalPay, body.path.totalWalkTime, body.path.transitCount);

            for (var i = 0; i < subPath.length; i++) {
                if (subPath[i].trafficType === 1) {
                    let stopArray = subPath[i].passStopList.stations;
                    let addSubwayResult = await schedules.addSubway(1, subPath[i].distance, subPath[i].sectionTime, subPath[i].stationCount, subPath[i].lane[0].subwayCode, subPath[i].startName, subPath[i].startX, subPath[i].startY, subPath[i].endName, subPath[i].endX, subPath[i].endY, stopArray, addPathsResult.insertId);
                    if (addSubwayResult === false) throw ({ code: addBusResult.code, json: addBusResult.json });
                    if (i !== 1) continue;
                    let subTime = await timeCalc.subwayTime(startTm, stopArray[0].stationID, subPath[i].wayCode, body.noticeMin, body.arriveCount, subPath[i].sectionTime);
                    if (subTime.code === statCode.BAD_REQUEST) throw (subTime);
                    for (var k = 0; k < body.arriveCount; k++) {
                        await schedules.addTime(moment(subTime.arriveArr[k]).format('YYYY-MM-DD HH:mm'), moment(subTime.noticeArr[k]).format('YYYY-MM-DD HH:mm'), addScheduleResult.insertId);
                        console.log(k + 1 + ' 번째 지하철 알림시간 추가 완료');
                    }
                    if (addSubwayResult != true) {
                        throw ({ code: addSubwayResult.code, json: addSubwayResult.json });
                    }
                    console.log('지하철 경로 추가 컨트롤러 접근 완료, 경로 번호 : ' + Number(i+1));
                }
                else if (subPath[i].trafficType === 2) {
                    let stopArray = subPath[i].passStopList.stations;
                    let addBusResult = await schedules.addBus(2, subPath[i].distance, subPath[i].sectionTime, subPath[i].stationCount, subPath[i].startName, subPath[i].startX, subPath[i].startY, subPath[i].endName, subPath[i].endX, subPath[i].endY, subPath[i].lane[0].busNo, subPath[i].lane[0].type, stopArray, addPathsResult.insertId);
                    if (addBusResult === false) throw ({ code: addBusResult.code, json: addBusResult.json });
                    if (i !== 1) continue;
                    let busTime = await timeCalc.busTime(subPath[i].lane[0].busNo, startTm, subPath[i].startName, body.arriveCount, body.noticeMin, subPath[i].sectionTime)
                    if (busTime.code === statCode.BAD_REQUEST) throw (busTime);
                    for (var k = 0; k < body.arriveCount; k++) {
                        await schedules.addTime(moment(busTime.arriveArr[k]).format('YYYY-MM-DD HH:mm'), moment(busTime.noticeArr[k]).format('YYYY-MM-DD HH:mm'), addScheduleResult.insertId);
                        console.log(k + 1 + ' 번째 버스 알림시간 추가 완료');
                    }
                    console.log('버스 경로 추가 컨트롤러 접근 완료, 경로 번호 : ' + Number(i+1));
                }
                else {
                    let addWalkResult = await schedules.addWalk(3, subPath[i].distance, subPath[i].sectionTime, addPathsResult.insertId);
                    if (addWalkResult ==false) throw ({ code: addWalkResult.code, json: addWalkResult.json });
                    console.log('걷기 경로 추가 완료, 경로 번호 : ' + Number(i+1));
                }
            } //stops ~ paths 추가
            if (body.weekdays !== undefined) {
                for (var i = 0; i < body.weekdays.length; i++) {
                    await schedules.addWeekdays(body.weekdays[i], addScheduleResult.insertId);
                }
            }
            await schedules.addUsersSchedules(body.userIdx, addScheduleResult.insertId);
            await schedules.addSchedulesPaths(addScheduleResult.insertId, addPathsResult.insertId);
            res.status(statCode.OK).send(resUtil.successTrue(resMsg.ADD_SCHEDULE_SUCCESS));
        }
        catch (exception) {
            console.log(exception);
            res.status(exception.code).send(exception.json);
        }

    },
    getSchedule: async (req, res) => {
        let scheduleIdx = req.query.scheduleIdx;
        if (!scheduleIdx) {
            return res.status(statCode.BAD_REQUEST).send(resUtil.successFalse('scheduleIdx에 해당하는 ' + resMsg.NULL_VALUE + '. 쿼리를 입력해주세요.'));
        }
        let getSchedulesResult = await schedules.getSchedules(scheduleIdx);
        console.log('get schedule complete!');
        if (getSchedulesResult.length == 0) {
            return res.status(statCode.BAD_REQUEST).send(resUtil.successFalse('scheduleIdx에 해당하는 ' + resMsg.INVALID_VALUE + ' scheduleIdx값을 확인해주세요.'));
        }
        res.status(statCode.OK).send(resUtil.successTrue(resMsg.GET_SCHEDULE_SUCCESS, getSchedulesResult));
    },
    deleteSchedule: async (req, res) => {
        let scheduleIdx = req.query.scheduleIdx;
        if (!scheduleIdx) {
            return res.status(statCode.BAD_REQUEST).send(resUtil.successFalse('scheduleIdx에 해당하는 ' + resMsg.NULL_VALUE + '. 쿼리를 입력해주세요.'));
        }
        const result = await schedules.deleteSchedule(scheduleIdx);
        console.log('delete schedule complete!');
        if (result[0].affectedRows == 0) {
            res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(resMsg.NO_CHANGE));
        } else {
            res.status(statCode.OK).send(resUtil.successTrue(resMsg.DELETE_SCHEDULE_SUCCESS));
        }
    },
    updateSchedule: async (req, res) => {
        let scheduleIdx = req.query.scheduleIdx;
        if (!scheduleIdx) {
            return res.status(statCode.BAD_REQUEST).send(resUtil.successFalse('scheduleIdx에 해당하는 ' + resMsg.NULL_VALUE + '. 쿼리를 입력해주세요.'));
        }
        let getSchedulesResult = await schedules.getSchedules(scheduleIdx);
        console.log('get schedule complete!');
        if (getSchedulesResult.length == 0) {
            return res.status(statCode.BAD_REQUEST).send(resUtil.successFalse('scheduleIdx에 해당하는 ' + resMsg.INVALID_VALUE + ' scheduleIdx값을 확인해주세요.'));
        }
        // add 코드 -> return insertId
        // delete 코드
        // delete 에서 에러 나면 add 해서 반환한 idx 찾아 삭제하기
    }
}