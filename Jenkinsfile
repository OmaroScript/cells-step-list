#!groovy

@Library("workflowlibs") _

pipeline {

    agent none

    options {
        ansiColor('xterm')
        buildDiscarder(logRotator(
            // number of builds to keep
            numToKeepStr:
                    env.BRANCH_NAME ==~ /master|release\/.*/ ? '10' :
                            env.BRANCH_NAME ==~ /PR-.*|feature\/.*|fix\/.*/ ? '3' : '1',
        ))
        disableResume()
        skipDefaultCheckout()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout Global Library') {
            steps {
                script{
                    globalBootstrap {
                        libraryName   = "cellsworkflowlibs"
                        libraryBranch = "3.1.0-cs.44"

                        entrypointParams = [
                            type                    : "cellsComponent",
                            logLevel                : "WARNING",
                            lint                    : true,
                            abortOnLintFailure      : true,
                            sonarQube               : true,
                            test                    : true,
                            deployS3                : false,
                            deploySecGCP            : false,
                            testLibraryVersion      : "master",

                            cellsConfig             : [
                                useBowerRepository  : "bower-virtual",
                                useBowerForce       : true,
                                storeLogs           : true,
                                cellsCLIVersion     : "3.3.0",
                                pepinoVersion       : "1.5.0"
                            ],

                            extended                : [
                                integrationPattern : [
                                    master: "feature/.+",
                                    release: "fix/.+"
                                ],
                                upgradeVersion      : true,
                                updateJenkinsfile   : true,
                                multiversion        : true
                            ],

                            samuelExtra             : [
                                owners          : ["d.rodriguez.guillen@bbva.com", "eneas.gallego.contractor@bbva.com", "adrianojose.martin.contractor@bbva.com"],
                                applyGroups     : "glomo-component-base",
                                projectJira     : "GLOMOGL,GLOMOAR,GLOMOMX,GLOMOPE,GLOMOUS,GLOMOUY,GLOMOCO",
                                projectSamuel   : "glomo"
                            ],

                            deployConfig            : [
                                deployArtifactory: true,
                                artifactoryConfig: [
                                    deployConfig: [branchRegEx: ["release/.*"], repository: "gl-glomo-bower", adminCredentialId: "bot-glomo-artifactory", userCredentialId: "glomo-artifactory" ]
                                ]
                            ],

                            samuelAnalysis          : true,
                            sonarConfig             : [
                                qualityProfile      : 'cells.app',
                                qualityGate         : 'glomo.app',
                                waitForQualityGate  : true,
                                wiggumReports       : false
                            ],

                            updateConfig            : [
                                updateFiles     : true,
                                jenkinsConfig   : [
                                    jobUpdate   : "job/DevOps/job/UTILS/job/UPDATE_JENKINSFILE",
                                    endPoint    : "https://globaldevtools.bbva.com/je-mm-gl-apps-cells-glomo-components"
                                ]
                            ],

                            notificationConfig : [
                                    branchRegExNot: "^(fix/.+)|^(feature/.+)",
                                    filterMail: "jenkins.piaas.group@bbva.com"
                            ]
                        ]
                    }
                }
            }
        }
    }
}