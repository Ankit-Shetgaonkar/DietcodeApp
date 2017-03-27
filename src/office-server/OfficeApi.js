import * as api from '../utils/api';
import RealmDatabse from '../database/RealmDatabase';

let userName = RealmDatabse.findUser()[0];

export function setUserName(userName1) {
    console.log("set user name ", userName);
    userName = userName1;
}

export async function createUser(slackId, firstName, deviceToken, profileImage, email) {
    let userobj = {
        "slackId": slackId,
        "email": email,
        "firstName": firstName,
        "deviceToken": deviceToken,
        "profileImage": profileImage
    };
    try {
        const resp = await api.post("https://dc-office.herokuapp.com/api/v1/users", userobj, true);
        return resp;
    }
    catch (error) {
        throw error;
    }
}

export async function checkinUser() {

    let timelineObj = {
        user: userName.serverId,
        description: userName.name + " checked in successfully",
        type: "checkin"
    };
    try {
        const resp = await api.post("https://dc-office.herokuapp.com/api/v1/timelines", timelineObj, true);
        return resp;
    }
    catch (error) {
        throw error;
    }
}

export async function checkoutUser() {

    let timelineObj = {
        user: userName.serverId,
        description: userName.name + " checked out successfully",
        type: "checkout"
    };
    try {
        const resp = await api.post("https://dc-office.herokuapp.com/api/v1/timelines", timelineObj, true);
        return resp;
    }
    catch (error) {
        throw error;
    }
}

export async function getLastCheckinCheckout(type) {
    if (typeof userName != 'undefined' && typeof userName.serverId != "undefined") {
        try {
            const resp = await api.get("https://dc-office.herokuapp.com/api/v1/timelines?type=" + type + "&user=" + userName.serverId + "&limit=1&sort=createdAt DESC", true);
            return resp;
        }
        catch (error) {
            throw error;
        }
    }
}

export async function getUserTimeline() {
    try {
        const resp = await api.get("https://dc-office.herokuapp.com/api/v1/timelines?user=" + userName.serverId + "&&sort=createdAt DESC&limit=20&skip=" + 0, true);
        return resp;
    }
    catch (error) {
        throw error;
    }
}

export async function getLeavesDetails() {
    try {
        const resp = await api.get("https://dc-office.herokuapp.com/api/cakehr/getUserDetails?user=" + userName.serverId, true);
        return resp;
    }
    catch (error) {
        throw error;
    }
}

export async function applyforLeave(cakeHrId, from, to, day_part, message) {

    if (day_part === "First Half") {
        day_part = 1;
    } else if (day_part === "Second Half") {
        day_part = 2;
    } else {
        day_part = 0;
    }

    let fromString = from.getFullYear()+"-"+from.getMonth()+"-"+from.getDate();
    let toString = to.getFullYear()+"-"+to.getMonth()+"-"+to.getDate();
    let leaveBody;
    if ((fromString == toString) && ((day_part == 1) || (day_part == 2))) {
        console.log("inside");
        leaveBody = {

            "cakehr_id": cakeHrId,
            "timeoff_id": "9931",
            "from": fromString,//"2023-7-04",
            "to": toString,//"2023-7-04",
            "day_part": day_part,
            "hours": 4,
            "message": message
        };
    } else {
        console.log("outside");
        leaveBody = {
            "cakehr_id": cakeHrId,
            "timeoff_id": "9931",
            "from": fromString,//"2023-7-04",
            "to": toString,//"2023-7-04",
            "message": message
        };
    }

    try {
        const resp = await api.post("https://dc-office.herokuapp.com/api/cakehr/addtimeoff", leaveBody, true);
        return resp;
    }
    catch (error) {
        throw error;
    }
}

export async function applyforWfh(cakeHrId, from, to, day_part, message) {

   if (day_part === "First Half") {
        day_part = 1;
    } else if (day_part === "Second Half") {
        day_part = 2;
    } else {
        day_part = 0;
    }
    let fromString = from.getFullYear()+"-"+from.getMonth()+"-"+from.getDate();
    let toString = to.getFullYear()+"-"+to.getMonth()+"-"+to.getDate();

 let leaveBody;
     if ((fromString == toString) && ((day_part == 1) || (day_part == 2))) {
        console.log("inside");
        leaveBody = {

            "cakehr_id": cakeHrId,
            "timeoff_id": "9931",
            "from": fromString,//"2023-7-04",
            "to": toString,//"2023-7-04",
            "day_part": day_part,
            "hours": 4,
            "message": message
        };
    } else {
        console.log("outside");
        leaveBody = {
            "cakehr_id": cakeHrId,
            "timeoff_id": "9931",
            "from": fromString,//"2023-7-04",
            "to": toString,//"2023-7-04",
            "message": message
        };
    }
    try {
        const resp = await api.post("https://dc-office.herokuapp.com/api/cakehr/addtimeoff", leaveBody, true);
        return resp;
    }
    catch (error) {
        throw error;
    }
}