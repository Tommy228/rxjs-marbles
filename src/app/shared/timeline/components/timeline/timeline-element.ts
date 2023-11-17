import { TimelineElementColor } from '../../services/colors-map';
import { TypeGuard } from '../../pipes/guard-type/guard-type-pipe';

export enum TimelineElementType {
  Value,
  Completion,
  Error,
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

export interface TimelineErrorElement<TValue>
  extends BaseTimelineElement<TimelineElementType.Error> {
  value: TValue;
}

export type TimelineElement =
  | TimelineValueElement<unknown>
  | BaseTimelineElement<TimelineElementType.Completion>
  | TimelineErrorElement<unknown>;

export const isValue: TypeGuard<
  TimelineElement,
  TimelineValueElement<unknown>
> = (element: TimelineElement): element is TimelineValueElement<unknown> =>
  element.type === TimelineElementType.Value;

export const isCompletion: TypeGuard<
  TimelineElement,
  BaseTimelineElement<TimelineElementType.Completion>
> = (
  element: TimelineElement,
): element is BaseTimelineElement<TimelineElementType.Completion> =>
  element.type === TimelineElementType.Completion;

export const isError: TypeGuard<
  TimelineElement,
  TimelineErrorElement<unknown>
> = (element: TimelineElement): element is TimelineErrorElement<unknown> =>
  element.type === TimelineElementType.Error;
