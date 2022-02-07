function fillterWantedNotificationsWhenGetThem(arr) {
    let body = []

    for (let i of arr) {
        if (i.type1 == 'Phone') {
            body.push("Add new Phone Interview")
        } else if (i.type1 == 'Contract') {
            body.push("Add new Contract Interview")
        } else if (i.type1 == 'Pass/Fail' && i.type2 == 'HR') {
            body.push("Pass/Fail HR Interview")
        } else if (i.type1 == 'Pass/Fail' && i.type2 == 'Technical') {
            body.push("Pass/Fail Technical Interview")
        } else if (i.type1 == 'newInterview' && i.type2 == 'Technical') {
            body.push("Add new Technical Interview")
        } else if (i.type1 == 'newProcess' && i.type2 == 'General') {
            body.push("Add new Process")
        } else if (i.type1 == 'newQuestion' && i.type2 == 'Technical') {
            body.push("Add new Technical Question")
        } else if (i.type1 == 'newQuestion' && i.type2 == 'HR') {
            body.push("Add new HR Question")
        } else if (i.type1 == 'contract' && i.type2 == 'General') {
            body.push("User sign a contract and start work")
        } else if (i.type1 == 'newInterview' && i.type2 == 'HR') {
            body.push("Add new HR Interview")
        }
    }
    return body
}


function fillterNotificatios(arr) {
    let wantedNotifications = []

    for (let i in arr) {
        let index = parseInt(i);
        if (arr[index] === "Add new Phone Interview") {
            wantedNotifications.push({ 'type1': 'Phone', 'type2': 'General' })
        } else if (arr[index] === "Add new Contract Interview") {
            wantedNotifications.push({ 'type1': 'Contract', 'type2': 'General' })
        } else if (arr[index] === "Pass/Fail HR Interview") {
            wantedNotifications.push({ 'type1': 'Pass/Fail', 'type2': 'HR' })
        } else if (arr[index] === "Pass/Fail Technical Interview") {
            wantedNotifications.push({ 'type1': 'Pass/Fail', 'type2': 'Technical' })
        } else if (arr[index] === "Add new HR Interview") {
            wantedNotifications.push({ 'type1': 'newInterview', 'type2': 'HR' })
        } else if (arr[index] === "Add new Technical Interview") {
            wantedNotifications.push({ 'type1': 'newInterview', 'type2': 'Technical' })
        } else if (arr[index] === "Add new Process") {
            wantedNotifications.push({ 'type1': 'newProcess', 'type2': 'General' })
        } else if (arr[index] === "Add new Technical Question") {
            wantedNotifications.push({ 'type1': 'newQuestion', 'type2': 'Technical' })
        } else if (arr[index] === "Add new HR Question") {
            wantedNotifications.push({ 'type1': 'newQuestion', 'type2': 'HR' })
        } else if (arr[index] === "User sign a contract and start work") {
            wantedNotifications.push({ 'type1': 'contract', 'type2': 'General' })
        }
    }
    return wantedNotifications
}



let allNots = ["Add new Phone Interview",
    "Add new Contract Interview",
    "Pass/Fail HR Interview",
    "Pass/Fail Technical Interview",
    "Add new HR Interview",
    "Add new Technical Interview",
    "Add new Process",
    "Add new Technical Question",
    "Add new HR Question",
    "User sign a contract and start work"]

module.exports = { fillterWantedNotificationsWhenGetThem, fillterNotificatios ,allNots }

