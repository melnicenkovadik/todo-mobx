import styled from 'styled-components';

const DeleteSvg = styled.svg`
  width: 20px;
  display: inline-block;
  line-height: 24px;
  vertical-align: sub;

  * {
    transition: all 0.2s ease;
  }
`;

export default function Checkbox() {
  return (
    <DeleteSvg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L11 11M1 11L11 1L1 11Z"
        stroke="#1b1b1b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </DeleteSvg>
  );
}
