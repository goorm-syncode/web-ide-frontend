import React from 'react';
import ProblemDescriptionPanel from '../../components/domain/ProblemDescriptionPanel';
import '../../styles/pages/DevProblemDescriptionPage.css';

const PROBLEM_DATA = {
  id: 1,
  title: '두 수의 합 (Two Sum)',
  difficulty: '쉬움',
  content: `
정수로 이루어진 배열 \`nums\`와 정수 \`target\`이 주어질 때, 
해당 배열 내에서 두 수의 합이 \`target\`이 되는 인덱스를 반환하세요.

각 입력에는 **정확히 하나의 해결책**이 있다고 가정하며, 동일한 요소를 두 번 사용할 수 없습니다.

답의 순서는 상관이 없습니다.

### 제약사항

* \`2 <= nums.length <= 10^4\`
* \`-10^9 <= nums[i] <= 10^9\`
* \`-10^9 <= target <= 10^9\`
* **정확히 하나의 유효한 답만 존재합니다.**
  `,
  examples: [
    {
      title: '예시 1',
      input: 'nums = [2, 7, 11, 15], target = 9',
      output: '[0, 1]',
      explanation: 'nums[0] + nums[1] == 9 이므로, [0, 1]을 반환합니다.',
    },
    {
      title: '예시 2 (긴 예제 테스트)',
      input: 'nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target = 19',
      output: '[8, 9]',
      explanation:
        '긴 리스트에서도 정상적으로 작동해야 합니다.\n' +
        '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n',
    },
  ],
};

const DevProblemDescriptionPage = () => {
  return (
    <div className="dev-problem-layout">
      <div className="panel-container">
        <ProblemDescriptionPanel
          title={PROBLEM_DATA.title}
          difficulty={PROBLEM_DATA.difficulty}
          markdownContent={PROBLEM_DATA.content}
          examples={PROBLEM_DATA.examples}
        />
      </div>
      <div className="placeholder-editor-container">
        <div className="placeholder-content">우측 패널 (코드 에디터 등)</div>
      </div>
    </div>
  );
};

export default DevProblemDescriptionPage;
