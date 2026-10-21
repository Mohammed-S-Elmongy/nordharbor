import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ErrorResponseDto {
@ApiProperty({
    example: 404,
    description: "HTTP status code of the error"
})
  statusCode!: number;

  @ApiProperty({
    example: "Resource not found",
    description: "Error message describing the issue"
  })
  message!: string;

  @ApiPropertyOptional({
    example: "Not Found",
    description: "Error type or code"
  })
  error?: string;
}
