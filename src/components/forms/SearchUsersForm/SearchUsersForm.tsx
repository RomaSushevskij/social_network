import SearchInputText from "../../generic/SearchInputText/SearchInputText";
import {Button} from "../../generic/Button/Button";
import React, {memo, useEffect} from "react";
import {useFormik} from "formik";
import style from "./SearchUsersForm.module.scss"
import Select from "../../generic/Select/Select";
import {
    getCurrentPageSelector,
    getPageSizeSelector,
    getSearchUsersFilterSelector
} from "../../../redux/selectors/usersSelectors";
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../../redux/hooks";
import {
    getUsers,
    SearchUsersFilterType,
    setCurrentPage,
    setSearchFilter
} from "../../../redux/redusers/usersReducer/usersReducer";
import {useDispatch} from "react-redux";
import {convertSearchSelectValue, convertSearchSelectValueBack} from "./utils/utils";

export type FormValuesType = {
    term: string,
    friend: string
};
export type  QueryParamsType = {
    term?: string;
    page?: string;
    friend?: string;
}

export const SearchUsersForm = memo(() => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const pageSize = useAppSelector(getPageSizeSelector);
    const currentPage = useAppSelector(getCurrentPageSelector);
    const {term, friend} = useAppSelector(getSearchUsersFilterSelector);
    const searchedUsers = ["All", "Followers", "Not followers"];

    const formik = useFormik({
        initialValues: {
            term,
            friend: convertSearchSelectValueBack(friend),
        },
        onSubmit: (values: FormValuesType) => {
            const correctValues = {...values, friend: convertSearchSelectValue(values.friend)};
            dispatch(getUsers(pageSize, 1, correctValues));
        },
        enableReinitialize: true,
    });
    const onSelectChange = (optionValue: string) => {
        const values: SearchUsersFilterType = {
            term: formik.values.term,
            friend: convertSearchSelectValue(optionValue),
        }
        dispatch(getUsers(pageSize, 1, values))
    }
    useEffect(() => {
        const newSearchParams: QueryParamsType = {};
        if (!!term) newSearchParams.term = term;
        if (friend !== null) newSearchParams.friend = String(friend);
        if (currentPage !== 1) newSearchParams.page = String(currentPage);
        setSearchParams(newSearchParams);
    }, [term, friend, currentPage])

    return (
        <form onSubmit={formik.handleSubmit} className={style.form}>
            <SearchInputText placeholder="Search users..." {...formik.getFieldProps("term")}/>
            <div className={style.selectBlock}>
                <Select onChangeOption={onSelectChange} options={searchedUsers} {...formik.getFieldProps("friend")}/>
            </div>
            <Button type="submit" name="Search"/>
        </form>
    )
});