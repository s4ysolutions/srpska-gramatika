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

import log from '../../log';
import {useCallback, useEffect, useState} from 'react';

const usePromise = <T>(promiseIssuer: ()=>Promise<T>, initialValue: T, key?: string): [T, () => void] => {
  if (key) {
    log.promiseUse(key);
  }
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    if (key) {
      log.promiseEffect(key);
    }
    promiseIssuer().then(value => {
      setState(value);
    });
  }, [key, promiseIssuer]);

  const memoizedNext = useCallback(() => {
    if (key) {
      log.promiseNext(key);
    }
    return promiseIssuer().then(value => {
      if (key) {
        log.promiseValue(key, value);
      }
      setState(value);
    });
  }, [key, setState, promiseIssuer]);

  if (key) {
    log.promiseState(key, state);
  }

  return [state, memoizedNext];
};

export default usePromise;

