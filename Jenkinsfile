// pipeline {
//     agent any
//     environment {
//         REMOTE_HOST = '3.131.137.248'
//         REMOTE_USER = 'ubuntu'
//         SSH_KEY = credentials('nextjs-server')
//     }
//     stages {
//         stage('connect with the server') {
//             steps {
//                 script {
//                     sh '''#!/bin/bash
//                     ssh -i "$SSH_KEY" $REMOTE_USER@$REMOTE_HOST "\
//                     cd /home/ubuntu/nextjs-firebase-authentication && \
//                     git pull origin dev && npm install && \
//                     sudo npm run build && pm2 restart nextjs-app"
//                     '''
//                 }
//             }
//         }
//         // Add more stages as needed
//     }
//     // Post-build actions or notifications can be added here
// }
node {
  stage('SCM') {
    checkout scm
  }

  stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarQube_Scanner'
    def nodeJSHome = tool 'node_v18' // Use the configured NodeJS installation

    withSonarQubeEnv() {
      sh """
        ${scannerHome}/bin/sonar-scanner \
        -Dsonar.exclusions=node_modules/** \
        -Dsonar.nodejs.executable=${nodeJSHome}/bin/node
      """
    }
  }
}

// No need to occupy a node
stage("Quality Gate"){
  timeout(time: 1, unit: 'MINUTES') { // Just in case something goes wrong, pipeline will be killed after a timeout
    def qg = waitForQualityGate() // Reuse taskId previously collected by withSonarQubeEnv
    if (qg.status != 'OK') {
      error "Pipeline aborted due to quality gate failure: ${qg.status}"
    }
  }
}

