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
//     def scannerHome = tool 'SonarQube_Scanner';
//     withSonarQubeEnv() {
//       sh "${scannerHome}/bin/sonar-scanner"
//     }
//   }
// }

pipeline {
  agent any

  tools {
    nodejs "node_v18" // Assuming "node_v18" is the name of your Node.js tool installation in Jenkins
  }

  stages {
    stage('Git Pull') {
      steps {
        echo 'Code Checkout'
        checkout scm
      }
    }

    stage('Install Typescript') {
      steps {
        sh 'npm install typescript'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        def scannerHome = tool 'SonarQube_Scanner';
        withSonarQubeEnv() {
          sh "${scannerHome}/bin/sonar-scanner"
        }
      }
    }
  }
}