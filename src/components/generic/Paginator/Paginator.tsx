import React, {useEffect, useMemo, useState} from "react";
import styleModule from './Paginator.module.scss';
import Select from '../Select/Select';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons/faAngleRight';


export type PaginatorPropsType = {
    portionSize: number
    currentPage: number
    pageSize: number
    totalItemsCount: number
    onChangePage: (pageNumber: number) => void
    onChangePageSize?: (pageSize: number) => void
}

export const Paginator = React.memo(({portionSize = 12, ...props}: PaginatorPropsType) => {

    const {pageCount, pages} = useMemo(() => {
        let pages: Array<number> = [];
        let pageCount: number;
        pageCount = Math.ceil(props.totalItemsCount / props.pageSize)

        for (let i = 1; i <= pageCount; i++) {
            pages.push(i)
        }
        return {pageCount, pages}


    }, [props.totalItemsCount, props.pageSize]);

    const itemsCounts = [20, 30, 40, 50, 100];

    let [portionNumber, setPortionNumber] = useState<number>(1);
    const portionCount: number = Math.ceil(pageCount / portionSize);
    let leftPortionPageNumber: number = useMemo(() => {
        return portionSize * (portionNumber - 1) + 1
    }, [portionSize,
        portionNumber])
    const rightPortionPageNumber: number = useMemo(() => {
        return portionSize * portionNumber;
    }, [portionSize, portionNumber]);

    useEffect(() => {
        if (props.currentPage > portionSize * portionNumber) {
            const currentPortionNumber = Math.floor(props.currentPage / portionSize +1)
            setPortionNumber(currentPortionNumber)
        }
    }, [props.currentPage])
    return (
        <div className={styleModule.paginator}>
            {portionNumber > 1 && <span className={styleModule.firstPage} onClick={() => {
                setPortionNumber(1)
            }}>{"First"}</span>}
            {portionNumber > 1 && <span className={styleModule.pagesToBack} onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>
                <FontAwesomeIcon icon={faAngleLeft}/>
            </span>}
            {portionNumber > 1 && <span className={styleModule.threeDots}>{"..."}</span>}

            {pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => <span key={page}
                                   className={props.currentPage === page ? `${styleModule.pageNumber} ${styleModule.selectedPageNumber}` : styleModule.pageNumber}
                                   onClick={() => {
                                       props.onChangePage(page)
                                   }}>{page}</span>
                )}

            {portionNumber < portionCount && <span className={styleModule.threeDots}>{"..."}</span>}
            {portionNumber < portionCount && <span className={styleModule.pagesToForward} onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>
                <FontAwesomeIcon icon={faAngleRight}/>
            </span>}
            {portionNumber < portionCount && <span className={styleModule.lastPage} onClick={() => {
                setPortionNumber(portionNumber = portionCount)
            }}>{"Last"}</span>}
            <div className={styleModule.pageCountSettings}>
                Show
                <span className={styleModule.select}>
                <Select options={itemsCounts}
                        value={props.pageSize}
                        onChangeOption={props.onChangePageSize}/>
                </span>
                items per page
            </div>
        </div>
    );
});