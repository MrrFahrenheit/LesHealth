import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class PrescriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const { items, ...prescriptionData } = data;
    return this.prisma.les_user_prescription.create({
      data: {
        ...prescriptionData,
        les_prescription_item: items ? { create: items } : undefined,
      },
      include: {
        les_prescription_item: true,
      }
    });
  }

  async findAll() {
    return this.prisma.les_user_prescription.findMany({
      include: { les_prescription_item: true }
    });
  }

  async findOne(id: string) {
    const prescription = await this.prisma.les_user_prescription.findUnique({
      where: { id },
      include: { les_prescription_item: true }
    });
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    return prescription;
  }

  async update(id: string, data: any) {
    await this.findOne(id); // Check existence
    
    return this.prisma.les_user_prescription.update({
      where: { id },
      data,
      include: { les_prescription_item: true }
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.les_user_prescription.delete({
      where: { id }
    });
  }

  // Prescription Items CRUD
  async addItem(prescriptionId: string, data: any) {
    await this.findOne(prescriptionId);
    return this.prisma.les_prescription_item.create({
      data: { ...data, prescription_id: prescriptionId }
    });
  }

  async removeItem(itemId: string) {
    const item = await this.prisma.les_prescription_item.findUnique({ where: { id: itemId } });
    if (!item) throw new NotFoundException(`Item with ID ${itemId} not found`);
    return this.prisma.les_prescription_item.delete({ where: { id: itemId } });
  }
}
