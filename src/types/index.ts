export interface ISort {
  name: string
  sortProperty: 'rating' | 'price' | 'title'
}

export interface IFetchPizza {
  limit: number
  currentPage: number
  searchValue: string
  categoryId: number
  sortType: string
  totalPages: number
}

export interface IForm {
  phone: string
  email: string
  city: string
  department: string
}

export interface IAreaData {
  data: {
    Area: string
    AreaDescription: string
    AreaDescriptionRu: string
    CityID: string
    Delivery1: string
    Delivery2: string
    Delivery3: string
    Delivery4: string
    Delivery5: string
    Delivery6: string
    Delivery7: string
    Description: string
    DescriptionRu: string
    IsBranch: string
    PreventEntryNewStreetsUser: string
    Ref: string
    SettlementType: string
    SettlementTypeDescription: string
    SettlementTypeDescriptionRu: string
    SpecialCashCheck: number
  }[]
}

export interface ICityNovaPoshta {
  cityName: string
  province: string
  cityRef: string
}

export interface IDepartmentsData {
  data: {
    Description: string
    Ref: string
    CityRef: string
  }[]
}

export interface IDepartmentNovaPoshta {
  department: string
  departmentRef: string
  cityRef: string
}

export interface IClickedCity {
  cityName: string
  cityRef: string
}
