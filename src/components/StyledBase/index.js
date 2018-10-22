import styled from 'styled-components';

export const COLOR_GRAY = '#F2F2F2';

export const Content = styled.div`
  padding: 20px;
  font-family: graphik,-apple-system,helvetica,futura,sans-serif;
`;

export const Title = styled.h2`
  font-size: 1.5em;
`;

export const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: 5px 10px;
  background-color: ${COLOR_GRAY};
`;

export const TableCell = styled.td`
  padding: 5px;
  border-bottom: 1px solid ${COLOR_GRAY};
`;
