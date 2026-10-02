import { spawnSync, type SpawnSyncOptions } from 'node:child_process';

// Windows: .cmd 実行にシェル必須 → 引数は明示クォート（シェル経由の空白分割回避）
const quote = (arg: string) => (/^[\w\-.:/=@,+]+$/.test(arg) ? arg : `"${arg.replaceAll('"', '\\"')}"`);

export function exec(command: string, args: string[], options: SpawnSyncOptions = {}): number {
  const windows = process.platform === 'win32';
  const { status } = spawnSync(windows ? quote(command) : command, windows ? args.map(quote) : args, {
    stdio: 'inherit',
    shell: windows,
    ...options,
  });
  return status ?? 1;
}
