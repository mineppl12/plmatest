export const pathKeys = {
    root: '/',
    home: {
        root(){
            return {
                link: pathKeys.root,
                permission: null
            }
        }
    },
    about: {
        root(){
            return {
                link: pathKeys.root.concat("about/"),
                permission: null
            };
        }
    },
    points: {
        root(){
            return pathKeys.root.concat("points/");
        },
        view(){
            return {
                link: pathKeys.points.root().concat("view/"),
                permission: "viewPointsView"
            };
        },
        apply(){
            return {
                link: pathKeys.points.root().concat("apply/"),
                permission: "viewPointsApply"
            };
        },
        edit(){
            return {
                link: pathKeys.points.root().concat("edit/"),
                permission: "viewPointsEdit"
            };
        },
        history(){
            return {
                link: pathKeys.points.root().concat("history/"),
                permission: "viewPointsHistory"
            };
        },
        remarks(){
            return {
                link: pathKeys.points.root().concat("remarks/"),
                permission: "viewPointsRemarks"
            };
        },
        reason(){
            return {
                link: pathKeys.points.root().concat("reason/"),
                permission: "viewPointsReason"
            };
        },
        logs(){
            return {
                link: pathKeys.points.root().concat("logs/"),
                permission: "viewPointsLogs"
            };
        },
        fix(){
            return {
                link: pathKeys.points.root().concat("fix/"),
                permission: "viewPointsFix"
            };
        },
        myPoints: {
            root(){
                return pathKeys.root.concat("myPoints/");
            },
            view(){
                return {
                    link: pathKeys.points.myPoints.root().concat("view/"),
                    permission: "viewMyPointsView"
                }
            },
            volunteer(){
                return {
                    link: pathKeys.points.myPoints.root().concat("volunteer/")
                }
            }
        }
    },
    dorm: {
        root(){
            return pathKeys.root.concat("dorm/");
        },
        status(){
            return {
                link: pathKeys.dorm.root().concat("status/"),
                permission: "viewDormStatus"
            };
        },
        settings(){
            return {
                link: pathKeys.dorm.root().concat("settings/"),
                permission: "viewDormSettings"
            };
        },
        repair(){
            return {
                link: pathKeys.dorm.root().concat("repair/"),
                permission: "viewDormRepair"
            }
        },
        myDorm: {
            root(){
                return pathKeys.dorm.root().concat("myDorm/");
            },
            view(){
                return {
                    link: pathKeys.dorm.myDorm.root().concat("view/"),
                    permission: "viewMyDormView"
                }
            },
            repair(){
                return {
                    link: pathKeys.dorm.myDorm.root().concat("repair/"),
                    permission: "viewMyDormRepair"
                }
            }
        }
    },
    remote: {
        root(){
            return pathKeys.root.concat("remote/");
        },
        case: {
            root(){
                return pathKeys.remote.root().concat("case/");
            },
            control(){
                return {
                    link: pathKeys.remote.case.root().concat("control/"),
                    permission: "viewRemoteCaseControl"
                };
            },
            history(){
                return {
                    link: pathKeys.remote.case.root().concat("history/"),
                    permission: "viewRemoteCaseHistory"
                };
            },
        }
    },
    plma: {
        root(){
            return pathKeys.root.concat("plma/");
        },
        accounts(){
            return {
                link: pathKeys.plma.root().concat("accounts/"),
                permission: "viewPLMAAccounts"
            };
        },
    },
    iam: {
        root(){
            return pathKeys.root.concat("iam/");
        },
        accounts(){
            return {
                link: pathKeys.iam.root().concat("accounts/"),
                permission: "viewIAMAccounts"
            };
        },
        access() {
            return {
                link: pathKeys.iam.root().concat("access/"),
                permission: "viewIAMAccess"
            };
        }
    },
    school: {
        root(){
            return pathKeys.root.concat("school/");
        },
        myInfo(){
            return {
                link: pathKeys.school.root().concat("studentInfo/"),
                permission: "viewSchoolMyInfo"
            }
        },
        reportCard(){
            return {
                link: pathKeys.school.root().concat("reportCard/"),
                permission: "viewSchoolReportCard"
            }
        }
    },
    page404() {
        return pathKeys.root.concat("404/");
    }
};