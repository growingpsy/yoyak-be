import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContentService {
  constructor(private configService: ConfigService) {} // ConfigService 주입

  async getNowPlayingMovies(): Promise<any> {
    const apiToken = this.configService.get<string>('API_TOKEN');

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiToken}`
      }
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      throw error;
    }
  }
}