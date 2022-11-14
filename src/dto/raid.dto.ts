import { IsNumber } from 'class-validator';

export class EnterRaidDto {
  @IsNumber()
  readonly level: number;

  @IsNumber()
  readonly userId: any;
}

export class EndRaidDto {
  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly userId: any;
}
