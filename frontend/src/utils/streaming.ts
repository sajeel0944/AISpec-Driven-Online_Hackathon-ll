// lib/utils/streaming.ts
export class StreamProcessor {
  private buffer: string = '';
  private lines: string[] = [];
  private currentIndex: number = 0;

  processChunk(chunk: string): string {
    this.buffer += chunk;
    const lines = this.buffer.split('\n');
    this.buffer = lines.pop() || '';
    
    let processedText = '';
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const content = line.substring(6);
        if (content.trim()) {
          processedText += content + '\n';
        }
      }
    }
    
    return processedText;
  }

  formatMarkdown(text: string): string {
    // Basic markdown formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\n/g, '<br />');
  }

  extractCodeBlocks(text: string): { code: string; language?: string }[] {
    const codeBlocks: { code: string; language?: string }[] = [];
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      codeBlocks.push({
        language: match[1],
        code: match[2]
      });
    }
    
    return codeBlocks;
  }
}