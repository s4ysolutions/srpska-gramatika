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
import {Box, Typography, useTheme} from '@mui/material';
import {nesvrsheni, svrsheni} from '../../../tutor/databases/conjugation/verbs';

const topSpace = 2;

const Rules: React.FunctionComponent<{ rules: string[] }> =
  ({rules}): React.ReactElement => {
    const theme = useTheme();
    const sx = useMemo(() => ({
      mt: theme.spacing(topSpace),
    }), [theme]);

    // filter for historical reason
    return <Box sx={sx} >
      {rules.filter(it => it === svrsheni || it === nesvrsheni).map(rule => <Typography align="center" key={rule} variant="body1" >
        {rule}
      </Typography >)}
    </Box >;
  };

export default Rules;
