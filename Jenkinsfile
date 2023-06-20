pipeline {
    agent any

    environment {
        IMAGE_REPOSITORY = 'registry.sehatq.com/sehatq/sehatq-web-monorepo'
    }

    stages {
        stage('Unit Test') {
            steps {
                echo 'unit test goes here'
            }
        }

        stage('Static Analysis') {
            steps {
                echo 'static analysis goes here'
            }
        }

        stage('Build and push Image') {
            parallel {
                stage('sehatq-dev') {
                    when {
                        branch "sehatq-dev"
                    }

                    steps {
                        sh '''#!/bin/bash
                        echo "sync image to s3"
                        aws s3 sync apps/sehatq/public/ s3://monorepo-cdnassets-dev/dev/public/ --delete
                        '''
                        sh '''#!/bin/bash
                        echo "Docker Image Build"
                        docker build -t $IMAGE_REPOSITORY:dev \
                        --build-arg SCOPE=sehatq \
                        --build-arg BUILD_CMD=build:sehatq-dev \
                        .
                        '''

                        sh "docker push $IMAGE_REPOSITORY:dev"
                    }
                }

                stage('sehatq-sanity') {
                    when {
                        branch 'sehatq-sanity'
                    }

                    steps {
                        sh '''#!/bin/bash
                        echo "sync image to s3"
                        aws s3 sync apps/sehatq/public/ s3://monorepo-cdnassets-sanity/sanity/public/ --delete
                        '''
                        sh '''#!/bin/bash
                        echo "Docker Image Build"
                        docker build -t $IMAGE_REPOSITORY:sanity \
                        --build-arg SCOPE=sehatq \
                        --build-arg BUILD_CMD=build:sehatq-sanity \
                        .
                        '''

                        sh "docker push $IMAGE_REPOSITORY:sanity"
                    }
                }

                stage('sehatq-rc') {
                    when {
                        branch 'sehatq-rc'
                    }

                    steps {
                        sh '''#!/bin/bash
                        echo "sync image to s3"
                        aws s3 sync apps/sehatq/public/ s3://monorepo-cdnassets/rc/public/ --delete
                        '''
                        sh '''#!/bin/bash
                        echo "Docker Image Build"
                        docker build -t $IMAGE_REPOSITORY:rc \
                        --build-arg SCOPE=sehatq \
                        --build-arg BUILD_CMD=build:sehatq-rc \
                        .
                        '''

                        sh "docker push $IMAGE_REPOSITORY:rc"
                    }
                }
            }
        }

        stage('Deployment') {
            parallel {
                stage('web-development') {
                    when {
                        branch 'sehatq-dev*'
                    }

                    steps {
                        dir('sehatq-helm-chart') {
                            git credentialsId: 'Jenkins-Bitbucket',
                                url: 'git@bitbucket.org:sehatq/sehatq-helm-chart.git',
                                branch: 'master'
                        }

                        dir('sehatq-helm-chart/sehatq-web-monorepo') {
                            sh '''
                            $K8S/helm upgrade --install --wait --timeout=300s monorepo-$BRANCH_NAME . \
                                --namespace=web-development --kube-context=sehatq-development \
                                -f values-$BRANCH_NAME.yaml
                            '''
                        }
                    }
                }

                stage('sanity') {
                    when {
                        anyOf {
                            branch 'sehatq-sanity'
                            branch 'sehatq-rc'
                        }
                    }

                    steps {
                        dir('sehatq-helm-chart') {
                            git credentialsId: 'Jenkins-Bitbucket',
                                url: 'git@bitbucket.org:sehatq/sehatq-helm-chart.git',
                                branch: 'master'
                        }

                        dir('sehatq-helm-chart/sehatq-web-monorepo') {
                            sh '''
                            $K8S/helm upgrade --install --wait --timeout=300s monorepo-$BRANCH_NAME . \
                                --namespace=sanity --kube-context=sehatq-development \
                                -f values-$BRANCH_NAME.yaml
                            '''
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'echo "Post build stage"'
        }

        success {
            echo 'I succeeded!'
            googlechatnotification url: 'https://chat.googleapis.com/v1/spaces/AAAAC5M-ccw/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=Z8H-ez3WaZELr49lkqQ_KVAOamvP9z9qMAuBO9csbKc%3D', message: "$BRANCH_NAME deploy SUCCESS", notifyAborted: 'false', notifyFailure: 'false', notifyNotBuilt: 'false', notifySuccess: 'true', notifyUnstable: 'false', notifyBackToNormal: 'false', suppressInfoLoggers: 'true', sameThreadNotification: 'false'
        }

        unstable {
            echo 'I am unstable :('
        }

        failure {
            echo 'I failed :(('
            googlechatnotification url: 'https://chat.googleapis.com/v1/spaces/AAAAC5M-ccw/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=Z8H-ez3WaZELr49lkqQ_KVAOamvP9z9qMAuBO9csbKc%3D', message: "$BRANCH_NAME deploy FAILED", notifyAborted: 'false', notifyFailure: 'true', notifyNotBuilt: 'false', notifySuccess: 'false', notifyUnstable: 'false', notifyBackToNormal: 'false', suppressInfoLoggers: 'true', sameThreadNotification: 'false'
        }
    }
}

