const data = {
        interviews : 
        [
            {
                id:101,
                status: "pass",
                type: "HR",
                date: "2021-12-23",
                interviewerName: "REEMA",
                scheduledSimulation: false,
            },
            {
                id: 102,
                status: "pass",
                type: "Technical interview",
                date: "2021-12-26",
                interviewerName: "reema",
                scheduledSimulation: false,
            },
            {
                id:  103,
                status: "fail",
                type: "HR",
                date: "2022-01-19",
                interviewerName: "SARA",
                scheduledSimulation: false
            },
            {
                id :104,
                status: "fail",
                type: "HR",
                date: "2022-01-03",
                interviewerName: "yosi",
                scheduledSimulation: false
            },
            {
                id : 105,
                status: "schuling",
                type: "HR",
                date: "2022-01-25",
                interviewerName: "FADY",
                scheduledSimulation: false
            },
            {
                id : 106,
                status: "fail",
                type: "HR",
                date: "2021-12-22",
                interviewerName: "MAYA",
                scheduledSimulation: false
            },
            {
                id: 107,
                status: "pass",
                type: "HR",
                date: "2021-12-22",
                interviewerName: "REEMA",
                scheduledSimulation: false
            },
            {
                id:108 ,
                status: "schuling",
                type: "Technical interview",
                date: "2021-12-23",
                interviewerName: "SHEMAON",
                scheduledSimulation: false
            }
        ],
        processes :  [
            {
                id:  11,
                isActive: true,
                interviews: [
                {
                    id: 101
                },
                {
                    id: 102
                }
                ],
                CompanyName: "Intel",
                JobTitle: "software engineer",
                Location: "Haifa",
                foundBy: "LinkedIn",
                processStatus : "InProgress"
            },
            {
                id: 12,
                isActive: false,
                interviews: [
                {
                    id: 103
                }
                ],
                CompanyName: "amdocs",
                JobTitle: "softwer",
                Location: "haifa",
                foundBy: "LinkedIn",
                processStatus : "InProgress"

            },
            {
                id: 13
                ,
                isActive: false,
                interviews: [
                {
                    id: 104
                }
                ],
                CompanyName: "cissco",
                JobTitle: "HR",
                Location: "Cisarea",
                foundBy: "friend bings friend",
                processStatus : "InProgress"

            },
            {
                id:  14,
                isActive: true,
                interviews: [
                {
                    id: 105
                }
                ],
                CompanyName: "APPEL",
                JobTitle: "SOFTWER",
                Location: "HAIFA",
                foundBy: "faceBook",
                processStatus : "InProgress"

            },
            {
                id:  15,
                isActive: false,
                interviews: [
                {
                    id: 106
                }
                ],
                CompanyName: "philips",
                JobTitle: "HR",
                Location: "Haifa",
                foundBy: "LinkedIn",
                processStatus : "InProgress"

            },
            {
                id: 16,
                isActive: true,
                interviews: [
                {
                    id: 107
                },
                {
                    id: 108
                }
                ],
                CompanyName: "Apple",
                JobTitle: "c++",
                Location: "Technical interview",
                foundBy: "faceBook",
                processStatus : "InProgress"

            },
            
        ],
        users : [
            {
                id: 1
                ,
                process: [
                {
                    id: 11
                },
                {
                    id: 13
                },
                {
                    id: 12
                },
                {
                    id: 14
                }
                ],
                firstName: "Amir",
                lastName: "Halaby",
                email: "amir@gmail.com",
                status: "student",
                cohort: "Atidna 4",
                mobileNo: "0502312673",
                password: "amir",
                isEmployee : false,
                CV : ""
            },
            {
                id: 2
                ,
                process: [
                {
                    id: 15
                }
                ],
                firstName: "sara",
                lastName: "zidan",
                email: "sara@gmail.com",
                status: "student",
                cycle: "Atidna 3",
                mobileNo: "050000000",
                password: "sara",
                isEmployee : false,
                CV : ""
            },
            {
                id: 3 ,
                job: [
                {
                    id: 16
                }
                ],
                firstName: "fady",
                lastName: "adkedk",
                email: "fady@gmail.com",
                status: "Graduate bootcamp",
                cycle: "Atidna 4",
                mobileNo: "050000513",
                password: "fady",
                isEmployee : false,
                CV : ""
            }
        ]
        
    }
    
    module.exports = data;


    