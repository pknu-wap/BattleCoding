#!/bin/bash

# === 사용자 설정 ===
JAR_NAME="battle-coding-0.0.1-SNAPSHOT.jar"
EC2_USER="ec2-user"
EC2_HOST="43.200.131.23"
EC2_KEY_PATH="/c/battle-coding-key.pem"
API_PORT=8080

# === [1] React .env 파일 수정 ===
echo "REACT_APP_API_URL=http://$EC2_HOST:$API_PORT" > frontend/.env

# === [2] React 빌드 및 복사 ===
echo "📦 [1/4] React 빌드 중..."
cd frontend || exit
npm install
npm run build

echo "📁 [2/4] 빌드 결과 백엔드로 복사..."
rm -rf ../backend/src/main/resources/static/*
cp -r build/* ../backend/src/main/resources/static/
cd ..

# === [3] Spring Boot 빌드 ===
echo "🛠️ [3/4] Spring Boot JAR 빌드 중..."
cd backend || exit
./gradlew clean build
cd ..

# === [4] EC2로 JAR 전송 + 재시작 ===
echo "🚀 [4/4] EC2 배포 시작..."
scp -i "$EC2_KEY_PATH" backend/build/libs/$JAR_NAME $EC2_USER@$EC2_HOST:~/

ssh -i "$EC2_KEY_PATH" $EC2_USER@$EC2_HOST << EOF
  pkill -f $JAR_NAME || true
  nohup java -jar $JAR_NAME > log.txt 2>&1 &
EOF

echo "🎉 배포 완료! http://$EC2_HOST:$API_PORT 에서 확인 가능"
