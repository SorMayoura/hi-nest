import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movies.entities';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll = () => {
    return this.movies;
  };

  getOne = (id: number) => {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ${id} not found.`);
    }
    return movie;
  };

  deleteOne = (id: number) => {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  };

  create(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateMovie: UpdateMovieDTO) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({
      ...movie,
      ...updateMovie,
    });
  }
}
