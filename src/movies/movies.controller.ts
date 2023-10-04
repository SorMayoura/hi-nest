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
import { Movie } from './entities/movies.entities';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  getMovie(@Param('id') id: number): Movie {
    return this.moviesService.getOne(id);
  }

  // Body will attached to the URL Ex: host?body1=hello&body2=hi
  // Query will not included in the URL
  @Post()
  createMovie(@Body() movieInput: CreateMovieDTO) {
    return this.moviesService.create(movieInput);
  }

  @Patch('/:id')
  updateMovie(
    @Param('id') id: number,
    @Body() movieUpdateInput: UpdateMovieDTO,
  ) {
    return this.moviesService.update(id, movieUpdateInput);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: number) {
    return this.moviesService.deleteOne(id);
  }
}
