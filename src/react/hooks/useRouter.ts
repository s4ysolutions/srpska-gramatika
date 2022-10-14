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


import {Route, RouteId} from '../../router';
import useObservable from './useObservable';
import {getRouter} from '../../di';

const router = getRouter();

const useRouter = (): [Route, (route: RouteId) => void] => {
  const route = useObservable(router.observableCurrentRoute, router.currentRoute);
  return [route, (routeId) => router.go(routeId)];
};

export default useRouter;