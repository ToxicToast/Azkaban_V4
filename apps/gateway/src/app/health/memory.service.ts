import { Inject, Injectable } from '@nestjs/common';
import { MemoryHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class MemoryService {

	constructor(
		@Inject('MEMORY_HEAP_TRESHOLD') private readonly heapTreshold: number,
		@Inject('MEMORY_RSS_TRESHOLD') private readonly rssTreshold: number,
		private readonly memory: MemoryHealthIndicator,
	) {}

	checkHeap() {
		return this.memory.checkHeap('memory_heap', this.heapTreshold)
	}

	checkRSS() {
		return this.memory.checkRSS('memory_rss', this.rssTreshold)
	}

}