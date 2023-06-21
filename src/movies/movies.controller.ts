import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly movieService: MoviesService, //
  ) {}

  /*

    {
    "title": "Tenet",
    "year": 2020,
    "genres": ["action", "mind blown"]
    }
  */

  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  //   @Get('search')
  //   search(
  //     @Query('year') year: string, //
  //   ) {
  //     return `searching movies made after ${year}`;
  //   }

  @Get('/:id')
  getOne(
    @Param('id') id: number, //
  ): Movie {
    return this.movieService.getOne(id);
  }

  @Post()
  createMovie(
    @Body() movieData: CreateMovieDto, //
  ) {
    return this.movieService.create(movieData);
  }

  @Delete('/:id')
  removeMovie(
    @Param('id') id: number, //
  ) {
    return this.movieService.deleteOne(id);
  }

  @Patch('/:id')
  patchMovie(
    @Param('id') id: number, //
    @Body() updateData: UpdateMovieDto,
  ) {
    return this.movieService.update(id, updateData);
  }
}
