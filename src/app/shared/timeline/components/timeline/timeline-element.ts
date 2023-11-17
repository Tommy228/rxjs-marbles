import { TimelineElementColor } from '../../services/colors-map';
import { TypeGuard } from '../../pipes/guard-type/guard-type-pipe';

export enum TimelineElementType {
  Value,
  Completion,
}

interface BaseTimelineElement<TType extends TimelineElementType> {
  type: TType;
  id: number;
  frame: number;
}

export interface TimelineValueElement<TValue>
  extends BaseTimelineElement<TimelineElementType.Value> {
  value: TValue;
  color: TimelineElementColor;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TimelineCompletionElement
  extends BaseTimelineElement<TimelineElementType.Completion> {}

export type TimelineElement =
  | TimelineValueElement<unknown>
  | TimelineCompletionElement;

export const isValue: TypeGuard<
  TimelineElement,
  TimelineValueElement<unknown>
> = (element: TimelineElement): element is TimelineValueElement<unknown> =>
  element.type === TimelineElementType.Value;

export const isCompletion: TypeGuard<
  TimelineElement,
  BaseTimelineElement<TimelineElementType.Completion>
> = (element: TimelineElement): element is TimelineCompletionElement =>
  element.type === TimelineElementType.Completion;
