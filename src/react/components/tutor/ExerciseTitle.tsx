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

import React, {ReactNode, useMemo} from 'react';
import {Typography, useTheme} from '@mui/material';

const topSpace = 2;

const ExerciseTitle: React.FunctionComponent<{title: string, children?: ReactNode[] | ReactNode}> =
  ({title, children}): React.ReactElement => {
    const theme = useTheme();
    const sx = useMemo(() => ({
      mt: theme.spacing(topSpace),
    }), [theme]);

    return <Typography align="center" sx={sx} variant="h5">
      {children}
    &nbsp;
      {title}
    </Typography>;
  };

export default ExerciseTitle;
