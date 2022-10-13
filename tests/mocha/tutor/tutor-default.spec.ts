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

import {use as chaiUse, expect} from 'chai';
import chaiString from 'chai-string';
import {
  GrammarCase,
  GrammarForm,
  GrammarGender,
  GrammarPlurality,
  LearningDB,
  NounsDB,
  Tutor,
} from '../../../src/tutor';
import {KvPromise} from '../../../src/kv/promise';
import {DefaultPronounsDB} from '../../../src/tutor/pronouns/default';
import memoryStoragePromiseFactory from '../../mocks/kv-promice/memoryStorage';
import {KvPromiseLearningDB} from '../../../src/tutor/learned/kv-promise-db';
import {DefaultTutor} from '../../../src/tutor/tutor/default';
import sinonApi, {SinonSandbox} from 'sinon';

chaiUse(chaiString);

describe('Tutor', () => {
  let promiseKV: KvPromise;
  let pronounsDB: NounsDB;
  let learnedDB: LearningDB;
  let tutor: Tutor;
  let sinon: SinonSandbox;

  beforeEach(() => {
    sinon = sinonApi.createSandbox();
    promiseKV = memoryStoragePromiseFactory({});
    pronounsDB = new DefaultPronounsDB();
    learnedDB = new KvPromiseLearningDB(promiseKV);
    tutor = new DefaultTutor(pronounsDB, learnedDB);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('nextPronounQuestion without forms and genders', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(0));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.SINGULAR));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.Instrumental));

    const exercise = await tutor.nextPronounExersizeSelectWord();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'ја');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'мном');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.Instrumental);
    expect(exercise.exerciseCase).to.not.has.property('gender');
    expect(exercise.exerciseCase).to.not.has.property('form');

    expect(await tutor.checkNounCaseAnswer('мном', exercise)).to.be.true;
    expect(await tutor.checkNounCaseAnswer('nnn', exercise)).to.be.false;
  });

  it('nextPronounQuestion with form and without gender', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(0));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.SINGULAR));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.Genitive));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomForm', sinon.fake.returns(GrammarForm.LONG));

    const exercise = await tutor.nextPronounExersizeSelectWord();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'ја');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'мене');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.Genitive);
    expect(exercise.exerciseCase).to.has.property('form', GrammarForm.LONG);
    expect(exercise.exerciseCase).to.not.has.property('gender');

    expect(await tutor.checkNounCaseAnswer('мене', exercise)).to.be.true;
    expect(await tutor.checkNounCaseAnswer('nnn', exercise)).to.be.false;
  });

  it('nextPronounQuestion with gender and no form', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(2));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.SINGULAR));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.Instrumental));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomGender', sinon.fake.returns(GrammarGender.FEMININE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'getWeightedArray', sinon.fake.returns(['ја', 'ти', 'он, она, оно']));

    const exercise = await tutor.nextPronounExersizeSelectWord();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'он, она, оно');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'њом');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.Instrumental);
    expect(exercise.exerciseCase).to.not.has.property('form');
    expect(exercise.exerciseCase).to.has.property('gender', GrammarGender.FEMININE);

    expect(await tutor.checkNounCaseAnswer('њом', exercise)).to.be.true;
    expect(await tutor.checkNounCaseAnswer('nnn', exercise)).to.be.false;
  });

  it('nextPronounQuestion with form and gender', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(2));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.SINGULAR));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.Genitive));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomForm', sinon.fake.returns(GrammarForm.LONG));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomGender', sinon.fake.returns(GrammarGender.FEMININE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'getWeightedArray', sinon.fake.returns(['ја', 'ти', 'он, она, оно']));

    const exercise = await tutor.nextPronounExersizeSelectWord();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'он, она, оно');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'ње');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.Genitive);
    expect(exercise.exerciseCase).to.has.property('form', GrammarForm.LONG);
    expect(exercise.exerciseCase).to.has.property('gender', GrammarGender.FEMININE);

    expect(await tutor.checkNounCaseAnswer('ње', exercise)).to.be.true;
    expect(await tutor.checkNounCaseAnswer('nnn', exercise)).to.be.false;
  });
});
