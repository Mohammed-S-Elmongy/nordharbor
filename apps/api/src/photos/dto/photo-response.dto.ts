import { ApiProperty } from "@nestjs/swagger";

export class PhotoResponseDto {
  @ApiProperty({
    example: 1,
    description: "The ID of the photo",
  })
  id!: number;

  @ApiProperty({
    example: "The young king",
    description: "The title of the photo",
  })
  title!: string;

  @ApiProperty({
    example: "A Young lion in the wild.",
    description: "The description of the photo",
  })
  description!: string;

  @ApiProperty({
    example: "the-young-king",
    description: "The slug of the photo",
  })
  slug!: string;

  @ApiProperty({
    example: "https://example.com/photos/1",
    description: "The Instagram URL of the photo",
  })
  instagramUrl!: string;

  @ApiProperty({
    example: "Wildlife",
    description: "The category of the photo",
  })
  category!: string;

  @ApiProperty({
    example: "Norway",
    description: "The location where the photo was taken",
  })
  location!: string;

  @ApiProperty({
    example: "Canon EOS R10",
    description: "The camera used to take the photo",
  })
  camera!: string;

  @ApiProperty({
    example: "RF100-400mm F4.5-5.6 L IS USM",
    description: "The lens used to take the photo",
  })
  lens!: string;

  @ApiProperty({
    example: true,
    description: "Indicates if the photo is featured",
  })
  featured!: boolean;
}
