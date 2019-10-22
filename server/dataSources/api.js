import { RESTDataSource } from 'apollo-datasource-rest';

class api extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://websiteuser3.apache.techcollege.dk/api';
  }

  //NEWS
  async news() {
    return this.get('news/get_news_list/');
  }
  
  async newsById(id) {
    return this.get(`news/get_news_by_id/${id}`);
  }

  //COUNTRY
  async countries() {
    return this.get('country/get_country_list/');
  }
  
  async countryById(id) {
    return this.get(`country/get_country_by_id/${id}`);
  }

  //CITY
  async cities() {
    return this.get('city/get_city_list/');
  }
  
  async cityById(id) {
    return this.get(`city/get_city_by_id/${id}`);
  }

  async citiesByCountry(id) {
    return this.get(`city/get_city_list_by_country_id/${id}`);
  }

  //HOTEL
  async hotels() {
    return this.get('hotel/get_hotel_list/');
  }
  
  async hotelById(id) {
    return this.get(`hotel/get_hotel_by_id/${id}`);
  }

  async hotelsByCity(id) {
    return this.get(`hotel/get_hotel_list_by_city_id/${id}`);
  }

  async facilitiesByHotel(id) {
    return this.get(`hotel/get_facility_list_by_hotel_id/${id}`);
  }

  //ROOM
  async rooms() {
    return this.get('room/get_room_list/');
  }
  
  async roomById(id) {
    return this.get(`room/get_room_by_id/${id}`);
  }

  async facilitiesByRoom(id) {
    return this.get(`room/get_facility_list_by_room_id/${id}`);
  }

  async imagesByRoom(id) {
    return this.get(`room/get_image_list_by_room_id/${id}`);
  }

  async roomsByHotel(id) {
    return this.get(`room/get_room_list_by_hotel_id/${id}`);
  }

  async allImages() {
    return this.get(`images/get_image_list/`);
  }
}
export default api
