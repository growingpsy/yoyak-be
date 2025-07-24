import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLibraryDto {
    readonly user_id!: number;
  }
  
  export class LibraryResponseDto {
    library_id!: number;
    user_id!: number;
  }  