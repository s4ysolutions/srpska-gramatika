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
import {Divider, Menu} from '@mui/material';
import useObservable from '../../hooks/useObservable';
import MenuItemReset from './menu-items/MenuItemReset';
import MenuItemPersonalPronounsDeclension from './menu-items/MenuItemPersonalPronounsDeclension';
import MenuItemInterrogativePronounsDeclension from './menu-items/MenuItemInterrogativePronounsDeclension';
import MenuItemCaseInterrogativesDeclension from './menu-items/MenuItemCaseInterrogativesDeclension';
import MenuItemBitiConjugation from './menu-items/MenuItemBitiConjugation';
import MenuItemNounsDeclension from './menu-items/MenuItemNounsDeclension';
import MenuItemHtetiConjugation from './menu-items/MenuItemHtetiConjugation';
import MenuItemVerbsConjugation from './menu-items/MenuItemVerbsConjugation';
import MenuItemReflexivePronounsDeclension from './menu-items/MenuItemReflexivePronounsDeclension';
import MenuItemPossessivePronounsDeclension from './menu-items/MenuItemPossessivePronounsDeclension';
import MenuItemVersion from './menu-items/MenuItemVersion';
import MenuItemMociConjugation from './menu-items/MenuItemMociConjugation';
import MenuItemVerbsConjugationForms from './menu-items/MenuItemVerbsConjugationForms';
import {getDi} from '../../../di';

const di = getDi();
const uiState = di.uiState;

const menuListProps = {'aria-labelledby': 'main-menu-button'};
const handleClose = () => {
  uiState.mainMenuOpen = false;
};

const MenuMain: React.FunctionComponent<{anchorEl: Element}> =
  ({anchorEl}): React.ReactElement => {

    const open = useObservable<boolean>(uiState.observableMainMenuOpen, uiState.mainMenuOpen);

    return <Menu
      MenuListProps={menuListProps}
      anchorEl={anchorEl}
      id="main-menu"
      onClose={handleClose}
      open={open}>

      <MenuItemNounsDeclension />

      <MenuItemPersonalPronounsDeclension />

      <MenuItemReflexivePronounsDeclension />

      <MenuItemPossessivePronounsDeclension />

      <MenuItemInterrogativePronounsDeclension />

      <MenuItemCaseInterrogativesDeclension />

      <MenuItemVerbsConjugationForms />

      <MenuItemVerbsConjugation />

      <MenuItemBitiConjugation />

      <MenuItemHtetiConjugation />

      <MenuItemMociConjugation />

      <Divider />

      <MenuItemReset />

      <Divider />

      <MenuItemVersion />

    </Menu>;
  };

export default MenuMain;
