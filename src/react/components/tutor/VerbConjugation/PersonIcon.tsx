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

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPerson as faMan} from '@fortawesome/free-solid-svg-icons';
import {CSS_SHIFT_LEFT} from '../constants';

const PersonIcon: React.FunctionComponent<{plural?: boolean}> = ({plural}): React.ReactElement | null => {
  const style = plural ? CSS_SHIFT_LEFT : {};
  // has gender return man/woman/cloud
  return <FontAwesomeIcon icon={faMan} style={style} />;
};

export default PersonIcon;
