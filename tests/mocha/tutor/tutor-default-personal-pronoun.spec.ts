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
  LearningDb,
  LessonsDb,
  NounsDb,
  Tutor,
} from '../../../src/tutor';
import {KvPromise} from '../../../src/kv/promise';
import {DefaultPersonalPronounsDb} from '../../../src/tutor/pronouns-personal/default';
import memoryStoragePromiseFactory from '../../mocks/kv-promice/memoryStorage';
import {KvPromiseLearningDb} from '../../../src/tutor/learned/kv-promise-db';
import {DefaultTutor} from '../../../src/tutor/tutor/default';
import sinonApi, {SinonSandbox} from 'sinon';
import {DefaultInterrogativePronounsDb} from '../../../src/tutor/personal-interrogative/default';
import {DefaultLessonsDb} from '../../../src/tutor/lessons/default';

chaiUse(chaiString);

describe('Tutor Personal Pronouns', () => {
  let promiseKV: KvPromise;
  let pronounsDB: NounsDb;
  let interrogativePronounsDB: DefaultInterrogativePronounsDb;
  let learnedDB: LearningDb;
  let lessons: LessonsDb;
  let tutor: Tutor;
  let sinon: SinonSandbox;

  beforeEach(() => {
    sinon = sinonApi.createSandbox();
    promiseKV = memoryStoragePromiseFactory({});
    pronounsDB = new DefaultPersonalPronounsDb();
    interrogativePronounsDB = new DefaultInterrogativePronounsDb();
    lessons = new DefaultLessonsDb();
    learnedDB = new KvPromiseLearningDb(promiseKV, lessons);
    tutor = new DefaultTutor(pronounsDB, interrogativePronounsDB, learnedDB, lessons);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('nextPersonalPronounExersizeSelectWord without forms and genders', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(0));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.SINGULAR));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.INSTRUMENTAL));

    const exercise = await tutor.nextPersonalPronounExersizeSelectWord();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'ја');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'мно̑м, мно́ме');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.INSTRUMENTAL);
    expect(exercise.exerciseCase).to.not.has.property('gender');
    expect(exercise.exerciseCase).to.not.has.property('form');

    expect(await tutor.checkNounCaseAnswer('мно̑м, мно́ме', exercise)).to.be.true;
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
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.GENITIVE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomForm', sinon.fake.returns(GrammarForm.LONG));

    const exercise = await tutor.nextPersonalPronounExersizeSelectWord();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'ја');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'ме̏не');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.GENITIVE);
    expect(exercise.exerciseCase).to.has.property('form', GrammarForm.LONG);
    expect(exercise.exerciseCase).to.not.has.property('gender');

    expect(await tutor.checkNounCaseAnswer('ме̏не', exercise)).to.be.true;
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
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.INSTRUMENTAL));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomGender', sinon.fake.returns(GrammarGender.FEMININE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'getWeightedArray', sinon.fake.returns(['ја', 'ти', 'он, она, оно']));

    const exercise = await tutor.nextPersonalPronounExersizeSelectWord();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'он, она, оно');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'њо̑м, њо́ме');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.INSTRUMENTAL);
    expect(exercise.exerciseCase).to.not.has.property('form');
    expect(exercise.exerciseCase).to.has.property('gender', GrammarGender.FEMININE);

    expect(await tutor.checkNounCaseAnswer('њо̑м, њо́ме', exercise)).to.be.true;
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
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.GENITIVE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomForm', sinon.fake.returns(GrammarForm.LONG));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomGender', sinon.fake.returns(GrammarGender.FEMININE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'getWeightedArray', sinon.fake.returns(['ја', 'ти', 'он, она, оно']));

    const exercise = await tutor.nextPersonalPronounExersizeSelectWord();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'он, она, оно');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'ње̑');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.GENITIVE);
    expect(exercise.exerciseCase).to.has.property('form', GrammarForm.LONG);
    expect(exercise.exerciseCase).to.has.property('gender', GrammarGender.FEMININE);

    expect(await tutor.checkNounCaseAnswer('ње̑', exercise)).to.be.true;
    expect(await tutor.checkNounCaseAnswer('nnn', exercise)).to.be.false;
  });
});

//  ја
// ед. ч., винительный, длинная форма