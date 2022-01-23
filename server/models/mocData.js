const data = {
        interviews : 
        [
            {
                id:101,
                isPassed: true,
                status: "pass",
                interviewType: "HR",
                interviewDate: "2021-12-23",
                interviewerName: "REEMA",
                scheduledSimulationInterview: false,
            },
            {
                id: 102,
                isPassed: true,
                status: "pass",
                interviewType: "Technical interview",
                interviewDate: "2021-12-26",
                interviewerName: "reema",
                scheduledSimulationInterview: false,
            },
            {
                id:  103,
                isPassed: false,
                status: "fail",
                interviewType: "HR",
                interviewDate: "2022-01-19",
                interviewerName: "SARA",
                scheduledSimulationInterview: false,
            },
            {
                id :104,
                isPassed: false,
                status: "fail",
                interviewType: "HR",
                interviewDate: "2022-01-03",
                interviewerName: "yosi",
                scheduledSimulationInterview: false,
            },
            {
                id : 105,
                isPassed: null,
                status: "schuling",
                interviewType: "HR",
                interviewDate: "2022-01-25",
                interviewerName: "FADY",
                scheduledSimulationInterview: false,
            },
            {
                id : 106,
                "isPassed": false,
                "status": "fail",
                "interviewType": "HR",
                "interviewDate": "2021-12-22",
                "interviewerName": "MAYA",
                "scheduledSimulationInterview": false,
            },
            {
                id: 107,
                isPassed: true,
                status: "pass",
                interviewType: "HR",
                interviewDate: "2021-12-22",
                interviewerName: "REEMA",
                scheduledSimulationInterview: false,
            },
            {
                id:108 ,
                isPassed: null,
                status: "schuling",
                interviewType: "Technical interview",
                interviewDate: "2021-12-23",
                interviewerName: "SHEMAON",
                scheduledSimulationInterview: false,
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
                gotJob: "LinkedIn",
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
                gotJob: "LinkedIn",
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
                gotJob: "friend bings friend",
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
                gotJob: "faceBook",
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
                gotJob: "LinkedIn",
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
                gotJob: "faceBook",
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
            }
        ]
        
    }


// let interviews = [
//     {
//         id:101,
//         isPassed: true,
//         status: "pass",
//         interviewType: "HR",
//         interviewDate: "2021-12-23",
//         interviewerName: "REEMA",
//         scheduledSimulationInterview: false,
//       },
//       {
//         id: 102,
//         isPassed: true,
//         status: "pass",
//         interviewType: "Technical interview",
//         interviewDate: "2021-12-26",
//         interviewerName: "reema",
//         scheduledSimulationInterview: false,
//     },
//     {
//         id:  103,
//         isPassed: false,
//         status: "fail",
//         interviewType: "HR",
//         interviewDate: "2022-01-19",
//         interviewerName: "SARA",
//         scheduledSimulationInterview: false,
//     },
//     {
//         id :104,
//         isPassed: false,
//         status: "fail",
//         interviewType: "HR",
//         interviewDate: "2022-01-03",
//         interviewerName: "yosi",
//         scheduledSimulationInterview: false,
//     },
//     {
//         id : 105,
//         isPassed: null,
//         status: "schuling",
//         interviewType: "HR",
//         interviewDate: "2022-01-25",
//         interviewerName: "FADY",
//         scheduledSimulationInterview: false,
//     },
//     {
//         id : 106,
//         "isPassed": false,
//         "status": "fail",
//         "interviewType": "HR",
//         "interviewDate": "2021-12-22",
//         "interviewerName": "MAYA",
//         "scheduledSimulationInterview": false,
//     },
//     {
//         id: 107,
//         isPassed: true,
//         status: "pass",
//         interviewType: "HR",
//         interviewDate: "2021-12-22",
//         interviewerName: "REEMA",
//         scheduledSimulationInterview: false,
//       },
//       {
//         id:108 ,
//         isPassed: null,
//         status: "schuling",
//         interviewType: "Technical interview",
//         interviewDate: "2021-12-23",
//         interviewerName: "SHEMAON",
//         scheduledSimulationInterview: false,
//       }
// ]


// let processes = [
//     {
//         id:  11,
//         isActive: true,
//         interviews: [
//           {
//             id: 101
//           },
//           {
//             id: 102
//           }
//         ],
//         CompanyName: "Intel",
//         JobTitle: "software engineer",
//         Location: "Haifa",
//         gotJob: "LinkedIn",
//     },
//     {
//         id: 12,
//         isActive: false,
//         interviews: [
//           {
//             id: 103
//           }
//         ],
//         CompanyName: "amdocs",
//         JobTitle: "softwer",
//         Location: "haifa",
//         gotJob: "LinkedIn",
//     },
//     {
//         id: 13
//         ,
//         isActive: false,
//         interviews: [
//           {
//             id: 104
//           }
//         ],
//         CompanyName: "cissco",
//         JobTitle: "HR",
//         Location: "Cisarea",
//         gotJob: "friend bings friend",
//     },
//     {
//         id:  14,
//         isActive: true,
//         interviews: [
//           {
//             id: 105
//           }
//         ],
//         CompanyName: "APPEL",
//         JobTitle: "SOFTWER",
//         Location: "HAIFA",
//         gotJob: "faceBook",
//     },
//     {
//         id:  15,
//         isActive: false,
//         interviews: [
//           {
//             id: 106
//           }
//         ],
//         CompanyName: "philips",
//         JobTitle: "HR",
//         Location: "Haifa",
//         gotJob: "LinkedIn",
//     },
//     {
//         id: 16,
//         isActive: true,
//         interviews: [
//           {
//             id: 107
//           },
//           {
//             id: 108
//           }
//         ],
//         CompanyName: "Apple",
//         JobTitle: "c++",
//         Location: "Technical interview",
//         gotJob: "faceBook",
//     },
    
// ]

// let users = [
//     {
//         id: 1
//         ,
//         process: [
//           {
//             id: 11
//           },
//           {
//             id: 13
//           },
//           {
//             id: 12
//           },
//           {
//             id: 14
//           }
//         ],
//         firstName: "Amir",
//         lastName: "Halaby",
//         email: "amir@gmail.com",
//         status: "student",
//         cohort: "Atidna 4",
//         mobileNo: "0502312673",
//         password: "amir",
//       },
//       {
//         id: 2
//         ,
//         process: [
//           {
//             id: 15
//           }
//         ],
//         firstName: "sara",
//         lastName: "zidan",
//         email: "sara@gmail.com",
//         status: "student",
//         cycle: "Atidna 3",
//         mobileNo: "050000000",
//         password: "sara",
//       },
//       {
//         id: 3 ,
//         job: [
//           {
//             id: 16
//           }
//         ],
//         firstName: "fady",
//         lastName: "adkedk",
//         email: "fady@gmail.com",
//         status: "Graduate bootcamp",
//         cycle: "Atidna 4",
//         mobileNo: "050000513",
//         password: "fady",
//       }
// ]

