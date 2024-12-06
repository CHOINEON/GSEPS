import { Column, ColumnOptions } from 'typeorm';

export function SensorColumn(additionalOptions: Partial<ColumnOptions> = {}) {
  return Column({
    type: 'float',
    nullable: true,
    ...additionalOptions, // 추가 옵션 적용
  });
}
