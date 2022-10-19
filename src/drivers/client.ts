
export interface Client {

  /**
   * 创建数据
   * @param data 
   */
  create(data: any): Promise<void>

  /**
   * 修改数据
   * @param id 
   * @param data 
   */
  update(data: any): Promise<void>

  /**
   * 删除数据
   */
  delete(data: any): Promise<void>
}