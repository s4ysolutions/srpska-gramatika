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

import React, {useMemo} from 'react';
import {Container, useTheme} from '@mui/material';
import {RouteId} from '../../../router';
import NounCases from '../tutor/NounCases';
import useRouter from '../../hooks/useRouter';
import log from '../../../log';

const topSpace = 2;

const Workspace: React.FunctionComponent = (): React.ReactElement => {
  log.render('Workspace');
  const theme = useTheme();
  const sx = useMemo(() => ({
    mt: theme.spacing(topSpace),
  }), [theme]);

  const [route] = useRouter();

  return <Container
    className="workspace"
    maxWidth="sm"
    sx={sx} >
    {route.id === RouteId.PRONOUNS_CASES && <NounCases />}
  </Container >;
};

export default Workspace;