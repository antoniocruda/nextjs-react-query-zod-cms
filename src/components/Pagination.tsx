import AngleLeftSolidIcon from '@/icons/AngleLeftSolidIcon';
import AngleRightSolidIcon from '@/icons/AngleRightSolidIcon';

type Props = {
    page: number;
    rowsPerPage: number;
    totalCount: number;
    onRowsPerPage: (rowsPerPage: number) => void;
    onPageChange: (page: number) => void;
    listOfRowsPerPage?: number[];
};

export default function Pagination({
    page,
    rowsPerPage,
    totalCount,
    onRowsPerPage,
    onPageChange,
    listOfRowsPerPage = [
        10,
        25,
        50,
        100
    ]
}: Props) {

    let pageRangeInfoStart = 1;
    let pageRangeInfoEnd = 1;
    if (totalCount <= 0) {
        pageRangeInfoStart = 0;
        pageRangeInfoEnd = 0;
    }
    else {
        pageRangeInfoStart = (page === 1) ? 1 : ((page * rowsPerPage) - rowsPerPage) + 1;
        pageRangeInfoEnd = page * rowsPerPage;

        if (pageRangeInfoEnd > totalCount || totalCount < rowsPerPage) {
            pageRangeInfoEnd = totalCount;
        }
    }

    const isLeftButtonDisabled = (pageRangeInfoStart <= 1);
    const isRightButtonDisabled = (pageRangeInfoEnd >= totalCount);

    return (
        <div className="flex justify-end mt-4 gap-4">
            <div className="flex gap-2 items-center">
                <label
                    htmlFor="rowsPerPage"
                    className="text-xs text-gray-500"
                >
                    Rows per page
                </label>

                <select
                    id="rowsPerPage"
                    className="form-field bg-white/40 w-fit text-xs"
                    onChange={(e) => onRowsPerPage(parseInt(e.target.value))}
                    value={rowsPerPage}
                >
                    {listOfRowsPerPage.map((rpp) => (
                        <option
                            key={`row_per_page_${rpp}`}
                            value={rpp}
                        >
                            {rpp}
                        </option>
                    ))}
                </select>
            </div>
            <span className="flex text-sm text-gray-500 items-center">
                { `${pageRangeInfoStart} - ${pageRangeInfoEnd}` }
                &nbsp;of&nbsp;
                { totalCount }
            </span>
            <div className="flex items-center gap-2">
                <button
                    disabled={isLeftButtonDisabled}
                    className={`
                        p-2 rounded-md
                        text-black disabled:text-gray-500
                        hover:bg-gray-100/10 disabled:hover:bg-transparent
                        cursor-pointer disabled:cursor-not-allowed
                    `}
                    onClick={() => onPageChange(page - 1)}
                >
                    <AngleLeftSolidIcon className="w-4 h-4"/>
                </button>

                <button
                    disabled={isRightButtonDisabled}
                    className={`
                        p-2 rounded-md
                        text-black disabled:text-gray-500
                        hover:bg-gray-100/10 disabled:hover:bg-transparent
                        cursor-pointer disabled:cursor-not-allowed
                    `}
                    onClick={() => onPageChange(page + 1)}
                >
                    <AngleRightSolidIcon className="w-4 h-4"/>
                </button>
            </div>
        </div>
    );
}