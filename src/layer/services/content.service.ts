/*
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
*/

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContentService {
  private readonly TMDB_BASE_URL: string;

  constructor(private configService: ConfigService) {
    this.TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  }

  async getAllContents(page = 1): Promise<any> {
    const apiToken = this.configService.get<string>('API_TOKEN');
    if (!apiToken) {
      throw new HttpException('API_TOKEN is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 각 카테고리별 엔드포인트
    const endpoints = {
      now_playing_movies: '/movie/now_playing', // 현재 상영 중인 영화
      on_air_dramas: '/tv/on_the_air', // 현재 방영 중인 드라마
      popular_movies: '/movie/popular', // 이번 주 인기 영화
      popular_tv_shows: '/tv/popular' // 인기 TV 프로그램
    };

    try {
      // 모든 요청을 병렬 처리 (Promise.all)
      const requests = Object.entries(endpoints).map(async ([key, path]) => {
        const url = `${this.TMDB_BASE_URL}${path}?language=ko-KR&page=${page}`;
        const response = await axios.get(url, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiToken}`
          }
        });
        return { [key]: response.data.results }; // 카테고리별 결과 저장
      });

      // 모든 데이터를 병렬로 가져와서 합치기
      const results = await Promise.all(requests);
      return Object.assign({}, ...results); // 하나의 객체로 반환
    } catch (error) {
      console.error('Error fetching content data:', error);
      throw new HttpException('Failed to fetch content data', HttpStatus.BAD_GATEWAY);
    }
  }
}
