/*
 * Copyright 2022 by s4y.solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Chip, Stack} from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PercentIcon from '@mui/icons-material/Percent';
import {LessonStatistics} from '../../../tutor';
import useObservable from '../../hooks/useObservable';
import React from 'react';
import {getDi} from '../../../di/default';
import log from '../../../log';

const di = getDi();
const learningDb = di.learningDb;
const tutor = di.tutor;

const PCT_100 = 100;
const pct = (total: number, wrong: number): number => total === 0 ? 0 : PCT_100 - Math.ceil(wrong * PCT_100 / total);

const Statistics: React.FunctionComponent<{initial: LessonStatistics}> = ({initial}): React.ReactElement => {
  log.render('Statistics', initial);
  const {total, wrong} = useObservable<LessonStatistics>(
    learningDb.observableLessonStatistics(tutor.currentLesson),
    initial,
    'Statistics',
  );

  return <Stack direction="row" spacing={2} >
    <Chip
      color="secondary"
      icon={<SummarizeIcon />}
      label={total}
    />

    <Chip
      color="success"
      icon={<PercentIcon />}
      label={pct(total, wrong)}
    />
  </Stack >;
};
export default Statistics;