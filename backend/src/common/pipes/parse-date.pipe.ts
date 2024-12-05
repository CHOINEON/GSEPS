import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string = ''): Date {
    if (value === '') {
      throw new BadRequestException('날짜가 필요합니다');
    }

    // 정규식으로 YYYY-MM-DD 형식 검증
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) {
      throw new BadRequestException('날짜는 YYYY-MM-DD 형식이어야 합니다');
    }

    const date = new Date(value);
    console.log(value);
    console.log(date);

    if (isNaN(date.getTime())) {
      throw new BadRequestException('올바른 날짜 형식이 아닙니다');
    }

    // UTC 시간을 KST로 변환 (UTC+9)
    const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
    const kstDate = new Date(date.getTime() + kstOffset);
    console.log(kstDate);

    // 시간을 00:00:00으로 설정
    kstDate.setHours(0, 0, 0, 0);

    return kstDate;
  }
}

@Injectable()
export class ParseNumberArrayPipe implements PipeTransform<string, number[]> {
  transform(value: string = ''): number[] {
    if (value === '') {
      return [];
    }
    return value.split(',').map(Number);
  }
}
