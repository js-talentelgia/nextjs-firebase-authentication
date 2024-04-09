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
// node {
//   stage('SCM') {
//     checkout scm
//   }

//   stage('SonarQube Analysis') {
//     def scannerHome = tool 'SonarQube_Scanner'
//     def nodeJSHome = tool 'node_v18' // Use the configured NodeJS installation

//     withSonarQubeEnv() {
//       sh """
//         ${scannerHome}/bin/sonar-scanner \
//         -Dsonar.exclusions=node_modules/** \
//         -Dsonar.nodejs.executable=${nodeJSHome}/bin/node
//       """
//     }
//   }
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

  stage('Check Security Hotspots') {
    def scannerHome = tool 'SonarQube_Scanner'
    def serverUrl = 'http://your-sonarqube-server-url' // Replace with your SonarQube server URL

    withSonarQubeEnv() {
      def taskId = sh(
        script: "${scannerHome}/bin/sonar-scanner -Dsonar.analysis.mode=preview -Dsonar.host.url=\"${serverUrl}\" | grep 'Task id:' | awk '{print \$3}'",
        returnStdout: true
      ).trim()
      
      if (taskId) {
        def apiUrl = "${serverUrl}/api/issues/search?componentKeys=${env.JOB_NAME}&types=SECURITY_HOTSPOT&statuses=OPEN&ps=1&asc=false&sonar.branch.name=${env.BRANCH_NAME}&taskId=${taskId}"
        def response = httpRequest(url: apiUrl, acceptType: 'APPLICATION_JSON')
        
        def issues = readJSON text: response.content
        
        if (issues.total > 0) {
          currentBuild.result = 'FAILURE'
          emailext(
            subject: "Security hotspots found in ${env.JOB_NAME} on branch ${env.BRANCH_NAME}",
            body: "Security hotspots have been found in the SonarQube scan. Please review and address them.",
            recipientProviders: [[$class: 'DevelopersRecipientProvider']],
            replyTo: "jenkins@yourcompany.com",
            attachLog: true
          )
        }
      } else {
        error "Failed to retrieve task ID from SonarQube scan."
      }
    }
  }
}

