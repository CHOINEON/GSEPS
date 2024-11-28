.PHONY: dev prod dev-down prod-down dev-rebuild prod-rebuild deploy

# 개발 환경
dev:
	docker-compose -f docker-compose.dev.yml --env-file .env.dev up -d

dev-down:
	docker-compose -f docker-compose.dev.yml --env-file .env.dev down

dev-rebuild:
	docker-compose -f docker-compose.dev.yml --env-file .env.dev up -d --build

# 프로덕션 환경
prod:
	docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

prod-down:
	docker-compose -f docker-compose.prod.yml --env-file .env.prod down

prod-rebuild:
	docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

# 배포 프로세스
deploy:
	git pull  # 최신 코드 가져오기
	docker-compose -f docker-compose.prod.yml --env-file .env.prod down  # 기존 컨테이너 중지
	docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build  # 새로 빌드 및 실행

# 로그 확인
prod-logs:
	docker-compose -f docker-compose.prod.yml --env-file .env.prod logs -f