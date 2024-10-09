import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosHeaders } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ApiKeyValueParams } from 'src/domain/business/slices/s4e/types';

@Injectable()
export class S4eConnectorDomainService {
  constructor(private readonly httpService: HttpService) {}

  sanitize(dictionary: ApiKeyValueParams): Record<string, string> {
    const oldTuples = Object.entries(dictionary);
    const newTuples: [string, string][] = [];

    for (const [key, value] of oldTuples) {
      if (
        value == null ||
        value == undefined ||
        (typeof value == 'string' && value?.trim() == '')
      ) {
        continue;
      }

      if (
        typeof value == 'boolean' ||
        typeof value == 'number' ||
        typeof value == 'bigint' ||
        typeof value == 'string'
      ) {
        newTuples.push([key, value.toString()]);
        continue;
      }
    }

    return Object.fromEntries<string>(newTuples);
  }

  async get<TResponse>(
    url: string,
    params?: Record<string, string | number | boolean>,
    headers?: AxiosHeaders,
  ): Promise<TResponse> {
    const observable = this.httpService.get<TResponse>(url, {
      headers,
      params,
    });
    return (await firstValueFrom(observable)).data;
  }

  async post<TResponse, TBody extends {}>(
    url: string,
    body: TBody,
    params?: Record<string, string | number | boolean>,
    headers?: AxiosHeaders,
  ): Promise<TResponse> {
    const observable = this.httpService.post<TResponse>(url, body, {
      headers,
      params,
    });
    return (await firstValueFrom(observable)).data;
  }
}
