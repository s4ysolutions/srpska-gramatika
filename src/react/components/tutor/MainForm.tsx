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

import {Typography, useTheme} from '@mui/material';
import React, {useMemo} from 'react';

const vSpace = 3;

const MainForm: React.FunctionComponent<{mainForm: string, small?: boolean}> = ({mainForm, small}): React.ReactElement => {
  const theme = useTheme();
  const sx = useMemo(() => ({
    mt: theme.spacing(vSpace),
    mb: theme.spacing(vSpace),
  }), [theme]);

  return <Typography align="center" sx={sx} variant={small ? 'h5' : 'h3'}>
    {mainForm}
  </Typography >;
};

export default MainForm;
