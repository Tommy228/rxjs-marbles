import { TimelineComponent } from './timeline.component';
import { MockComponent } from 'ng-mocks';
import { TimelineValueComponent } from '../timeline-value/timeline-value.component';
import { TimelineCompletionComponent } from '../timeline-completion/timeline-completion.component';
import {
  createHostFactory,
  createSpyObject,
  SpectatorHost,
} from '@ngneat/spectator/jest';
import {
  TimelineElement,
  TimelineElementType,
  TimelineValueElement,
} from './timeline-element';
import { ColorsMap, TimelineElementColor } from '../../services/colors-map';
import { GuardTypePipe } from '../../pipes/guard-type/guard-type-pipe';
import { CdkDrag, CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
import { fakeAsync, waitForAsync } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ResizedDirective, ResizedEvent } from 'angular-resize-event';

describe('TimelineComponent', () => {
  let spectator: SpectatorHost<TimelineComponent>;

  let sideNavOpenedStream: Subject<void>;
  let sideNavClosedStream: Subject<void>;

  const createHost = createHostFactory({
    component: TimelineComponent,
    declarations: [
      MockComponent(TimelineValueComponent),
      MockComponent(TimelineCompletionComponent),
      GuardTypePipe,
    ],
    imports: [DragDropModule],
    shallow: true,
  });

  const getTimelineLine = () =>
    spectator.query<HTMLDivElement>('[data-timeline-line]');

  beforeEach(() => {
    sideNavClosedStream = new Subject();
    sideNavOpenedStream = new Subject();

    spectator = createHost(
      `<app-timeline [elements]='elements' [maxFrames]='maxFrames' [colorsMap]='colorsMap' [hasName]='false'/>`,
      {
        hostProps: {
          elements: [],
          maxFrames: 10,
          colorsMap: createSpyObject(ColorsMap),
        },
      }
    );
  });

  // Force the width of the timeline line to 200px, then trigger a resize event to update
  // the computed width.
  const resize = (width: number): void => {
    const timelineLine = getTimelineLine();
    if (timelineLine == null) {
      return;
    }
    jest.spyOn(timelineLine, 'offsetWidth', 'get').mockReturnValue(width);
    const resizedDirective = spectator.query(ResizedDirective);
    resizedDirective?.resized.next(
      new ResizedEvent({} as DOMRectReadOnly, undefined)
    );
  };

  beforeEach(waitForAsync(() => {
    resize(200);
  }));

  beforeEach(() => {
    spectator.setHostInput({
      elements: [
        {
          type: TimelineElementType.Value,
          id: 0,
          color: TimelineElementColor.Color1,
          frame: 0,
          value: 'A',
        },
        {
          type: TimelineElementType.Value,
          id: 1,
          color: TimelineElementColor.Color2,
          frame: 3,
          value: 'B',
        },
        {
          type: TimelineElementType.Completion,
          id: 2,
          frame: 5,
        },
      ] satisfies TimelineElement[],
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render timeline values', () => {
    const timelineValues = spectator.queryAll(TimelineValueComponent);
    const timelineValuesDragElements = spectator.queryAll(
      TimelineValueComponent,
      {
        read: CdkDrag,
      }
    );
    expect(timelineValues.length).toBe(2);
    expect(timelineValues[0].value).toBe('A');
    expect(timelineValuesDragElements[0].getFreeDragPosition()).toEqual({
      x: 0,
      y: 0,
    });
    expect(timelineValues[1].value).toBe('B');
    expect(timelineValuesDragElements[1].getFreeDragPosition()).toEqual({
      x: 60,
      y: 0,
    });
  });

  it.each([['opened'], ['closed']])(
    'should resize the timeline when the sidenav is %s',
    fakeAsync((action: 'opened' | 'closed') => {
      resize(100);

      if (action === 'opened') {
        sideNavOpenedStream.next();
      } else {
        sideNavClosedStream.next();
      }
      spectator.tick(200);
      spectator.detectChanges();

      spectator.fixture.whenStable().then(() => {
        const timelineValuesDragElements = spectator.queryAll(
          TimelineValueComponent,
          {
            read: CdkDrag,
          }
        );
        expect(timelineValuesDragElements[1].getFreeDragPosition()).toEqual({
          x: 30,
          y: 0,
        });
      });
    })
  );

  it('should render the completion', () => {
    const completions = spectator.queryAll(TimelineCompletionComponent);
    const completionDragElements = spectator.queryAll(
      TimelineCompletionComponent,
      {
        read: CdkDrag,
      }
    );
    expect(completions.length).toBe(1);
    expect(completionDragElements[0].getFreeDragPosition()).toEqual({
      x: 100,
      y: 0,
    });
  });

  // Skipped: waiting for @ngneat/spectator to support output functions
  it.skip('should update the elements position when an element is dragged', () => {
    let output: TimelineElement[] | undefined;
    spectator
      .output('elementsChange')
      .subscribe((result) => (output = result as TimelineElement[]));

    const timelineValuesDragElement = spectator.query(TimelineValueComponent, {
      read: CdkDrag,
    });

    expect(timelineValuesDragElement).not.toBeNull();

    jest
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked above
      .spyOn(timelineValuesDragElement!, 'getFreeDragPosition')
      .mockReturnValue({ x: 20, y: 0 });

    spectator.triggerEventHandler('app-timeline-value', 'cdkDragMoved', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked above
      source: timelineValuesDragElement!,
      pointerPosition: { x: 20, y: 0 },
      event: new MouseEvent('mousemove', { clientX: 10, clientY: 0 }),
      distance: { x: 20, y: 0 },
      delta: { x: 1, y: 0 },
    } satisfies CdkDragMove<void>);

    expect(
      (output?.[0] as TimelineValueElement<string> | undefined)?.frame
    ).toBe(1);
  });

  // Skipped: waiting for @ngneat/spectator to support output functions
  it.skip('should not do anything if the width is not set', fakeAsync(() => {
    let output: TimelineElement[] | undefined;
    spectator
      .output('elementsChange')
      .subscribe((result) => (output = result as TimelineElement[]));

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- for testing purposes
    resize(null!);
    spectator.tick(200);

    const timelineValuesDragElement = spectator.query(TimelineValueComponent, {
      read: CdkDrag,
    });
    expect(timelineValuesDragElement).toBeNull();
    spectator.triggerEventHandler('app-timeline-value', 'cdkDragMoved', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked above
      source: timelineValuesDragElement!,
      pointerPosition: { x: 20, y: 0 },
      event: new MouseEvent('mousemove', { clientX: 10, clientY: 0 }),
      distance: { x: 20, y: 0 },
      delta: { x: 1, y: 0 },
    } satisfies CdkDragMove<void>);

    expect(output).toBeUndefined();
  }));

  // Skipped: waiting for @ngneat/spectator to support output functions
  it.skip('should not do anything if the element has not moved', () => {
    let output: TimelineElement[] | undefined;
    spectator
      .output('elementsChange')
      .subscribe((result) => (output = result as TimelineElement[]));

    const timelineValuesDragElement = spectator.query(TimelineValueComponent, {
      read: CdkDrag,
    });
    expect(timelineValuesDragElement).not.toBeNull();

    jest
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked above
      .spyOn(timelineValuesDragElement!, 'getFreeDragPosition')
      .mockReturnValue({ x: 0, y: 0 });

    spectator.triggerEventHandler('app-timeline-value', 'cdkDragMoved', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked above
      source: timelineValuesDragElement!,
      pointerPosition: { x: 0, y: 0 },
      event: new MouseEvent('mousemove', { clientX: 10, clientY: 0 }),
      distance: { x: 0, y: 0 },
      delta: { x: 0, y: 0 },
    } satisfies CdkDragMove<void>);

    expect(output).toBeUndefined();
  });
});
