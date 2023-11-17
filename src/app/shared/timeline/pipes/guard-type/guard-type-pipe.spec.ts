import { GuardTypePipe } from './guard-type-pipe';

describe('GuardTypePipe', () => {
  let pipe: GuardTypePipe;

  beforeEach(() => {
    pipe = new GuardTypePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform value when type guard passes', () => {
    const typeGuard = (a: 1): a is 1 => a === 1;
    const result = pipe.transform(1, typeGuard);
    expect(result).toBe(1);
  });

  it('should return undefined when type guard fails', () => {
    const typeGuard = (a: 1): a is 1 => a === 1;
    const result = pipe.transform(2 as never, typeGuard);
    expect(result).toBeUndefined();
  });
});
